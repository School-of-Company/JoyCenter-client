import InformationSection from '@/widgets/main/ui/InformationSection';
import IntroduceSection from '@/widgets/main/ui/IntroduceSection';
import MainSection from '@/widgets/main/ui/MainSection';

export default function MainView() {
  return (
    <div>
      <MainSection />
      <IntroduceSection />
      <InformationSection />
    </div>
  );
}
