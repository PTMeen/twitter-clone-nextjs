import Header from "@/components/Header";
import PageSpinner from "@/components/PageSpinner";
import NotificationFeed from "@/components/notification/NotificationFeed";
import useNotifications from "@/hooks/useNotifications";

function notifications() {
  const { data: notifications = [], isLoading } = useNotifications();

  if (isLoading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Header title="Notifications" />
      <NotificationFeed notifications={notifications} />
    </>
  );
}
export default notifications;
