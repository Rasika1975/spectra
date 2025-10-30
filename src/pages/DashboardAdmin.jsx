import { useState } from "react";
import {
  Compass,
  User,
  Users,
  Edit,
  Calendar,
  CreditCard,
  Mail,
  History,
} from "lucide-react";

const DashboardAdmin = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: Compass },
    { name: "Members", icon: User },
    { name: "Clubs", icon: Users },
    { name: "Blogs", icon: Edit },
    { name: "Events", icon: Calendar },
    { name: "Subscriptions", icon: CreditCard },
    { name: "Contact", icon: Mail },
    { name: "History", icon: History },
  ];

  // ------------------------ SECTION RENDERERS --------------------------
  const renderSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-purple-700">
              Platform Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Total Members", value: "5,000" },
                { label: "Total Clubs", value: "150" },
                { label: "Total Events", value: "500" },
                { label: "Active Blogs", value: "1,200" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6 rounded-xl shadow-lg"
                >
                  <h3 className="text-lg font-semibold">{stat.label}</h3>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        );

      // ------------------- MEMBERS -------------------
      case "Members":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Manage Members</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">College</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Riya Sharma", college: "MIT", email: "riya@gmail.com", status: "Active" },
                  { name: "Arjun Mehta", college: "PCCOE", email: "arjun@gmail.com", status: "Pending" },
                ].map((m, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{m.name}</td>
                    <td className="p-3">{m.college}</td>
                    <td className="p-3">{m.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          m.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <button className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 mr-2">
                        Approve
                      </button>
                      <button className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      // ------------------- CLUBS -------------------
      case "Clubs":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Clubs & Communities</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Tech Innovators",
                  members: "120",
                  img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=60",
                },
                {
                  name: "Art Fusion",
                  members: "80",
                  img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
                },
              ].map((club, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <img src={club.img} alt={club.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{club.name}</h3>
                    <p className="text-gray-600 mb-3">Members: {club.members}</p>
                    <div className="flex gap-2">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                        View
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ------------------- BLOGS -------------------
      case "Blogs":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Blogs Management</h2>
            <div className="space-y-4">
              {[
                { title: "Future of AI in Education", author: "Admin", date: "Oct 20, 2025" },
                { title: "How Clubs Empower Students", author: "Admin", date: "Oct 25, 2025" },
              ].map((blog, i) => (
                <div
                  key={i}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold text-lg">{blog.title}</h3>
                    <p className="text-gray-500 text-sm">
                      By {blog.author} • {blog.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ------------------- EVENTS -------------------
      case "Events":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Events Management</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Tech Expo 2025",
                  date: "Nov 15, 2025",
                  img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
                },
                {
                  name: "Cultural Fest",
                  date: "Dec 3, 2025",
                  img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60",
                },
              ].map((event, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
                >
                  <img src={event.img} alt={event.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{event.name}</h3>
                    <p className="text-gray-600 mb-3">Date: {event.date}</p>
                    <div className="flex gap-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                        View Registrations
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // ------------------- SUBSCRIPTIONS -------------------
      case "Subscriptions":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { plan: "Monthly", price: "₹299" },
                { plan: "6-Monthly", price: "₹1499" },
                { plan: "Yearly", price: "₹2499" },
              ].map((plan, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-6 shadow hover:shadow-md text-center"
                >
                  <h3 className="font-bold text-lg mb-2">{plan.plan}</h3>
                  <p className="text-2xl font-semibold text-purple-600">{plan.price}</p>
                  <button className="mt-3 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                    Edit Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      // ------------------- CONTACT -------------------
      case "Contact":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact & Enquiries</h2>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Subject</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Neha Patil", email: "neha@gmail.com", subject: "Event Inquiry" },
                  { name: "Rohit Jain", email: "rohit@gmail.com", subject: "Club Registration" },
                ].map((c, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.subject}</td>
                    <td className="p-3">
                      <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      // ------------------- HISTORY -------------------
      case "History":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Activity History</h2>
            <ul className="space-y-3">
              {[
                "Riya Sharma joined 'Tech Innovators' Club",
                "Admin edited 'Future of AI' blog",
                "Cultural Fest event registration closed",
              ].map((h, i) => (
                <li
                  key={i}
                  className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500"
                >
                  <p>{h}</p>
                  <p className="text-xs text-gray-500 mt-1">Just now</p>
                </li>
              ))}
            </ul>
          </div>
        );

      default:
        return <div>Dashboard</div>;
    }
  };

  // ------------------------ RENDER PAGE --------------------------
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-center">Admin Panel</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    activeSection === item.name
                      ? "bg-purple-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default DashboardAdmin;
