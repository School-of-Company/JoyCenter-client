import { Section } from '@jump-section/react';

export default function IntroduceSection() {
  return (
    <Section
      id="introduce"
      className="relative flex h-[800px] flex-col items-center justify-center gap-10 overflow-hidden px-4 py-40 text-center"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[400px] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-[1196px] bg-[rgba(243,211,114,0.40)] blur-[150px]" />
      <h2 className="text-h1">더기쁨노인복지센터 소개</h2>
      <div className="h-px w-10 bg-gray-500" />
      <div className="text-body1 space-y-4">
        <p>
          안녕하세요. 더기쁨노인복지센터 홈페이지를 방문해 주셔서 감사합니다.
        </p>
        <p>
          더기쁨노인복지센터는 몸이 불편하신 어르신들이 가정과 같은 편안함
          속에서 <br />
          안전하고 행복한 일상을 보내실 수 있도록 전문적인 돌봄과 따뜻한
          마음으로 함께하고 있습니다. <br />
          어르신 한 분 한 분을 가족처럼 모시며 일상생활을 돕고 정성 어린 케어로
          삶의 질을 높이기 위해 노력합니다. <br />
        </p>
        <p>
          <b>
            더기쁨노인복지센터는 어르신에게는 기쁨을, 가족에게는 안심을 드리는
            동반자
          </b>
          가 되겠습니다.
        </p>
      </div>
    </Section>
  );
}
