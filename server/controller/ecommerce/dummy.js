{
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color = "";

      switch (status) {
        case "PENDING":
          color = "orange";
          break;
        case "CANCELED":
          color = "red";
          break;
        case "DELIVERED":
            color = "purple";
            break;
        case "HOLD":
          color = "blue";
          break;
        case "COMPLETED":
          color = "green";
          break;
        case "PROCESSING":
          color = "cyan";
          break;
        case "SHIPPED":
          color = "geekblue";
          break;
        
        case "REFUNDED":
          color = "magenta";
          break;
        case "ON_HOLD":
          color = "gold";
          break;
        case "PARTIALLY_SHIPPED":
          color = "volcano";
          break;
        // Add more cases as needed...

        default:
          color = "default";
      }

      return <Tag color={color}>{status}</Tag>;
    },
  },