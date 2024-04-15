import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const CardWrapper = ({ children, title }: Props) => {
  return (
    <Card className="mx-auto my-auto h-fit max-w-sm w-[340px]">
      <CardHeader>
        <CardTitle className="text-center text-3xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default CardWrapper;
