import { Container } from "../Container";
import { NavLinks } from "./NavLinks";
import { Headline } from "../Headline";

export const Navigation = () => {
  return (
    <header className="z-20">
      <nav className="shadow-md">
        <Container className="relative z-50 flex justify-between py-5 ">
          <div className="relative z-10 flex items-center w-full justify-between">
            <div>
              <Headline title="Musik Samspil" textColor="text-custom-red" />
              <p className="text-steel-blue text-[10px]">
                Skabt af DAOS - Dansk Amatørorkester Samvirke
              </p>
            </div>
            <div className="hidden lg:flex lg:gap-10">
              <NavLinks isMobile={false} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <NavLinks isMobile={true} />
          </div>
        </Container>
      </nav>
    </header>
  );
};
