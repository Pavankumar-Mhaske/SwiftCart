<div>
  {description && description.length > 70 ? (
    <p dangerouslySetInnerHTML={{ __html: description.substring(0, 68) + "..." }} />
  ) : (
    <p dangerouslySetInnerHTML={{ __html: description }} />
  )}
</div>



  // date
  {
    title: "Date (IST)",
    dataIndex: "date",
    // convert in the form of 29/10/2023, 24:41:25 IST
    render: (date) => {
      const originalDate = new Date(date);

      // Convert to IST (UTC+5:30)
      const istDate = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // Use 24-hour format
      });

      const formattedDate = `${istDate.format(originalDate)}`;

      return <>{formattedDate}</>;
    },
  },
 