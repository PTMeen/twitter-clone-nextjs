import Header from "@/components/Header";
import useCurrentUser from "@/hooks/useCurrentUser";

function HomePage() {
  const { data, mutate } = useCurrentUser();
  console.log(data);

  return (
    <>
      <Header title="Home" />
    </>
  );
}
export default HomePage;
