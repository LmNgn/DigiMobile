import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line } from "recharts";
function Home() {
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
  
  const clients = [
    { id: 1, name: "Sunil Joshi", address: "Số 1 Lê Thái Tổ, Quận Hoàn Kiếm, Hà Nội", priority: "Low", budget: "$3.9k" },
    { id: 2, name: "Andrew McDownland", address: "Số 25 Tông Đản, Quận Hoàn Kiếm, Hà Nội", priority: "Medium", budget: "$24.5k" },
    { id: 3, name: "Christopher Jamil", address: "Số 18 Ngọc Hà, Quận Ba Đình, Hà Nội", priority: "High", budget: "$12.8k" },
    { id: 4, name: "Nirav Joshi", address: "Số 1 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội", priority: "Critical", budget: "$2.4k" },
    { id: 5, name: "Tim George", address: "Số 19C Hoàng Diệu, Quận Ba Đình, Hà Nội", priority: "Critical", budget: "$5.4k" },
  ];
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
              <h5>Lưu lượng truy cập</h5>
              <h3>$36,358</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={trafficData} dataKey="value" fill="#0088FE" label />
                </PieChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-3 mt-3">
              <h5>Doanh số</h5>
              <h3>$6,820</h3>
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
                <li>09:30 am - Đã nhận được thanh toán từ Nguyen Tuan</li>
                <li>10:00 am - Đơn hàng mới</li>
                <li>12:00 am - Đã thanh toán $64,95</li>
                <li>09:30 am - Nguyen Tuan đã thanh toán: $60</li>
              </ul>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="p-3">
              <h5>Khách hàng mua nhiều nhất</h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Priority</th>
                    <th>Budget</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.name}</td>
                      <td>{client.address}</td>
                      <td>{client.priority}</td>
                      <td>{client.budget}</td>
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
  