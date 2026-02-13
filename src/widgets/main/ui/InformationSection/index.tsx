import KakaoMap from '@/entity/main/ui/KakaoMap';
import Explanation from '@/entity/main/ui/KakaoMap/Explanation';
import Company from '@/shared/assets/svg/Company';
import FAX from '@/shared/assets/svg/FAX';
import MapPin from '@/shared/assets/svg/MapPin';
import Phone from '@/shared/assets/svg/Phone';
import { Section } from '@jump-section/react';

export default function InformationSection() {
  return (
    <Section
      id="information"
      className="flex min-h-[800px] flex-col items-center justify-around gap-8 px-4 py-8 lg:flex-row lg:gap-4 lg:py-0"
    >
      <div className="flex w-full max-w-[700px] flex-col justify-around gap-6 lg:gap-8">
        <Explanation
          title="전화번호"
          description="062-372-3525"
          Icon={<Phone />}
        />
        <Explanation
          title="팩스번호"
          description="062-372-3526"
          Icon={<FAX />}
        />
        <Explanation
          title="회사명"
          description="더기쁨노인복지센터"
          Icon={<Company />}
        />
        <Explanation
          title="주소"
          description="광주 서구 금호동 금부로 103번길 4-11"
          Icon={<MapPin />}
        />
      </div>
      <div className="flex w-full max-w-[700px] flex-col items-center justify-center gap-3">
        <h3 className="text-h3 text-center">오시는 길</h3>
        <KakaoMap />
      </div>
    </Section>
  );
}
