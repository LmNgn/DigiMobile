import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line } from "recharts";
import { useList } from "./hooks/useList";
function Home() {
  const { data: products = [] } = useList({ resource: "products" });
  const { data: users = [] } = useList({ resource: "users" });
  const { data: orders = [] } = useList({ resource: "orders" });

  const profitData = [
    { day: "Mon", profit: 8, expense: 3 },
    { day: "Tue", profit: 6, expense: 5 },
    { day: "Wed", profit: 9, expense: 6 },
    { day: "Thu", profit: 7, expense: 4 },
    { day: "Fri", profit: 10, expense: 5 },
    { day: "Sat", profit: 5, expense: 3 },
    { day: "Sun", profit: 6, expense: 4 },
  ];

  const trafficData = [
    { name: "Organic", value: 60 },
    { name: "Referral", value: 40 },
  ];

  const salesData = [
    { day: "Mon", sales: 500 },
    { day: "Tue", sales: 700 },
    { day: "Wed", sales: 600 },
    { day: "Thu", sales: 800 },
    { day: "Fri", sales: 750 }, 
    { day: "Sat", sales: 500 },
    { day: "Sun", sales: 620 },
  ];

  const topUsers = users.slice(0, 5); // hoặc lọc theo điều kiện cụ thể hơn nếu có
  const totalRevenue = products.reduce((acc: any, item: any) => acc + Number(item.price || 0), 0);

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={8}>
          <Card className="p-3">
            <h5>Lợi nhuận và Chi phí</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={profitData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="profit" fill="#0088FE" />
                <Bar dataKey="expense" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3">
            <h5>Tổng doanh thu (từ sản phẩm)</h5>
            <h3>${totalRevenue.toLocaleString()}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={trafficData} dataKey="value" fill="#0088FE" label />
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card className="p-3 mt-3">
            <h5>Tổng đơn hàng: {orders.length}</h5>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={salesData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>Lịch trình</h5>
            <ul>
              <li>09:30 am - Nhận được thanh toán từ khách hàng</li>
              <li>10:00 am - Đơn hàng mới được tạo</li>
              <li>12:00 pm - Đã xử lý thanh toán</li>
              <li>02:30 pm - Khách hàng đăng ký mới</li>
            </ul>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>Khách hàng</h5>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Trạng thái</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user: any) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.status ? "Hoạt động" : "Khoá"}</td>
                    <td>{user.role || "customer"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
