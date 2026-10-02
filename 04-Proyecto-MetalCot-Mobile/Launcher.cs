using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Diagnostics;
using System.Threading;
using System.Collections.Generic;

namespace CotyFTLauncher
{
    class Program
    {
        private static HttpListener listener;
        private static string baseDir;
        private static bool isRunning = true;

        [STAThread]
        static void Main(string[] args)
        {
            baseDir = AppDomain.CurrentDomain.BaseDirectory;

            // Encontrar puerto libre
            int port = GetFreePort();

            // Iniciar servidor HTTP embebido
            listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:" + port + "/");
            try
            {
                listener.Start();
            }
            catch (Exception)
            {
                // Fallback si no tiene permisos
                listener.Prefixes.Clear();
                listener.Prefixes.Add("http://127.0.0.1:" + port + "/");
                listener.Start();
            }

            // Iniciar escucha en segundo plano
            ThreadPool.QueueUserWorkItem((o) =>
            {
                while (isRunning && listener.IsListening)
                {
                    try
                    {
                        var context = listener.GetContext();
                        ThreadPool.QueueUserWorkItem((c) => HandleRequest((HttpListenerContext)c), context);
                    }
                    catch { }
                }
            });

            string url = "http://localhost:" + port + "/index.html";

            // Buscar Edge o Chrome para modo App nativa
            string browserPath = FindChromiumBrowser();
            Process appProcess = null;

            if (!string.IsNullOrEmpty(browserPath))
            {
                string dataDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CotyFT", "AppData");
                try { Directory.CreateDirectory(dataDir); } catch { }

                ProcessStartInfo psi = new ProcessStartInfo
                {
                    FileName = browserPath,
                    Arguments = "--app=\"" + url + "\" --window-size=440,920 --user-data-dir=\"" + dataDir + "\"",
                    UseShellExecute = false
                };

                try
                {
                    appProcess = Process.Start(psi);
                }
                catch
                {
                    appProcess = null;
                }
            }

            if (appProcess == null)
            {
                // Fallback al navegador predeterminado del sistema
                Process.Start(new ProcessStartInfo(url) { UseShellExecute = true });
                
                // Mantener vivo el servidor por si es pestaña compartida
                Thread.Sleep(3000);
            }
            else
            {
                // Esperar a que el usuario cierre la ventana de la app
                appProcess.WaitForExit();
            }

            isRunning = false;
            try { listener.Stop(); } catch { }
        }

        private static int GetFreePort()
        {
            TcpListener l = new TcpListener(IPAddress.Loopback, 0);
            l.Start();
            int port = ((IPEndPoint)l.LocalEndpoint).Port;
            l.Stop();
            return port;
        }

        private static string FindChromiumBrowser()
        {
            string[] possiblePaths = new string[]
            {
                @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
                @"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
                @"C:\Program Files\Google\Chrome\Application\chrome.exe",
                @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), @"Microsoft\Edge\Application\msedge.exe"),
                Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), @"Google\Chrome\Application\chrome.exe")
            };

            foreach (string p in possiblePaths)
            {
                if (File.Exists(p)) return p;
            }
            return null;
        }

        private static void HandleRequest(HttpListenerContext context)
        {
            try
            {
                string rawUrl = context.Request.Url.AbsolutePath;
                if (rawUrl == "/" || string.IsNullOrEmpty(rawUrl))
                    rawUrl = "/index.html";

                rawUrl = rawUrl.TrimStart('/').Replace('/', Path.DirectorySeparatorChar);
                string filePath = Path.Combine(baseDir, rawUrl);

                if (!File.Exists(filePath))
                {
                    context.Response.StatusCode = 404;
                    byte[] notFound = System.Text.Encoding.UTF8.GetBytes("404 Not Found");
                    context.Response.OutputStream.Write(notFound, 0, notFound.Length);
                    context.Response.Close();
                    return;
                }

                string ext = Path.GetExtension(filePath).ToLowerInvariant();
                string mime = "application/octet-stream";
                switch (ext)
                {
                    case ".html": mime = "text/html; charset=utf-8"; break;
                    case ".css": mime = "text/css; charset=utf-8"; break;
                    case ".js": mime = "application/javascript; charset=utf-8"; break;
                    case ".json": mime = "application/json"; break;
                    case ".png": mime = "image/png"; break;
                    case ".jpg": case ".jpeg": mime = "image/jpeg"; break;
                    case ".svg": mime = "image/svg+xml"; break;
                    case ".ico": mime = "image/x-icon"; break;
                }

                byte[] fileBytes = File.ReadAllBytes(filePath);
                context.Response.ContentType = mime;
                context.Response.ContentLength64 = fileBytes.Length;
                context.Response.AddHeader("Access-Control-Allow-Origin", "*");
                context.Response.OutputStream.Write(fileBytes, 0, fileBytes.Length);
                context.Response.Close();
            }
            catch
            {
                try { context.Response.Close(); } catch { }
            }
        }
    }
}
