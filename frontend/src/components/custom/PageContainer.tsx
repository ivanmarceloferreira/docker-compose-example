import { cn } from "@/lib/utils";
import { ReactElement } from "react";

const PageContainer = ({
  children,
  className,
}: {
  children: ReactElement | ReactElement[];
  className?: string;
}) => {
  return (
    <section className="flex w-full min-h-screen flex-1 items-center">
      <section className="flex w-full h-full flex-col gap-4">
        <div
          className={cn(
            "rounded-lg bg-white p-4 h-full w-full flex",
            className
          )}
        >
          {children}
        </div>
      </section>
    </section>
  );
};

export default PageContainer;
