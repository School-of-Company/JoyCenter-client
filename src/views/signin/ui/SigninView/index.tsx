import Logo from '@/shared/assets/svg/Logo';
import SigninButtons from '@/widgets/signin/ui/SigninButtons';

export default function SigninView() {
  return (
    <section className="flex h-[90vh] items-center justify-center">
      <div className="bg-main-yellow-50 flex h-2/5 w-1/3 flex-col items-center justify-center rounded-[20px] p-7">
        <Logo width={240} height={103} />
        <SigninButtons />
      </div>
    </section>
  );
}
