import AvatarPicker from "./components/AvatarPicker";
import { AVATARS } from "./constants";

export default function App() {
  return (
    <main>
      <AvatarPicker avatars={AVATARS} />
    </main>
  );
}
