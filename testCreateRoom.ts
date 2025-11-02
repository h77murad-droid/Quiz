import { createRoomAndHost, getPlayersInRoom } from "./lib/gameApi";

async function main() {
  try {
    // جرّب باسم مضيف واضح علشان نعرفه في الداشبورد
    const hostName = "حسن المضيف";

    console.log("🛠 نقوم بإنشاء غرفة جديدة للمضيف:", hostName);

    const result = await createRoomAndHost(hostName);

    console.log("✅ تم إنشاء الغرفة بنجاح:");
    console.log("رمز الغرفة:", result.room_code);
    console.log("بيانات المضيف:", result.host_player);

    console.log("\n👥 جلب اللاعبين الحاليين في الغرفة...");
    const players = await getPlayersInRoom(result.room_code);
    console.log("اللاعبين المسجلين حالياً:", players);

    console.log("\n🚀 الاختبار انتهى بدون استثناءات.");
  } catch (err) {
    console.error("❌ صار خطأ أثناء الاختبار:", err);
  }
}

main();
