import 'package:flutter_test/flutter_test.dart';
import 'package:metalcot_pro/main.dart';

void main() {
  testWidgets('CotyFTApp smoke test', (WidgetTester tester) async {
    await tester.pumpWidget(const CotyFTApp());
    expect(find.text('CotyFT'), findsWidgets);
  });
}
