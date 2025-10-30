import { useState } from "react";
import {
  Home,
  Users,
  Edit,
  Calendar,
  Image as ImageIcon,
  CreditCard,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardClub = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: Home },
    { name: "Members", icon: Users },
    { name: "Blogs", icon: Edit },
    { name: "Events", icon: Calendar },
    { name: "Media", icon: ImageIcon },
    { name: "Subscription", icon: CreditCard },
    { name: "Contact", icon: Mail },
  ];

  const renderSection = () => {
    switch (activeSection) {
      /** 🏠 Dashboard Overview */
      case "Dashboard":
        return (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6">Club Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {[
                { label: "Members", value: "150", color: "bg-blue-100 text-blue-700" },
                { label: "Upcoming Events", value: "5", color: "bg-purple-100 text-purple-700" },
                { label: "Blogs", value: "20", color: "bg-pink-100 text-pink-700" },
                { label: "Photos", value: "58", color: "bg-green-100 text-green-700" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`p-5 rounded-lg shadow-md bg-white border-t-4 ${item.color}`}
                >
                  <h3 className="text-lg font-semibold">{item.label}</h3>
                  <p className="text-3xl font-bold mt-2">{item.value}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-gray-50 p-6 border rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Welcome, Club Representative 👋</h3>
              <p className="text-gray-600">
                Manage your club members, host events, post blogs, and showcase your media.
                Stay active to grow your community!
              </p>
            </div>
          </motion.div>
        );

      /** 👥 Members Section */
      case "Members":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Member Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((id) => (
                <div
                  key={id}
                  className="border rounded-lg p-4 shadow-sm bg-white flex flex-col items-center"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/men/${id + 10}.jpg`}
                    alt="Member"
                    className="w-20 h-20 rounded-full mb-3"
                  />
                  <h4 className="font-semibold">Member {id}</h4>
                  <p className="text-sm text-gray-500 mb-2">Pending Approval</p>
                  <div className="flex gap-3">
                    <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-700">
                      Approve
                    </button>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      /** ✍️ Blogs Section */
      case "Blogs":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Club Blogs</h2>
            <div className="border rounded-lg p-4 mb-6 bg-white shadow-sm">
              <h3 className="font-semibold mb-2">Add New Blog</h3>
              <input
                type="text"
                placeholder="Enter blog title"
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <textarea
                rows="4"
                className="w-full border rounded-lg px-3 py-2 mb-3"
                placeholder="Write blog content..."
              ></textarea>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Publish
              </button>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Recent Blogs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((id) => (
                  <div key={id} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
                    <img
                      src={`https://source.unsplash.com/random/400x250?club,community,${id}`}
                      alt="Blog"
                      className="rounded-lg mb-2"
                    />
                    <h4 className="font-semibold">Blog Title {id}</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      A short description of the blog...
                    </p>
                    <button className="text-sm text-red-500 hover:underline">Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      /** 🎟️ Events Section */
      case "Events":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Event Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((id) => (
                <div key={id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <img
                    src={`https://source.unsplash.com/random/400x250?event,club,${id}`}
                    alt="Event"
                    className="rounded-lg mb-3"
                  />
                  <h3 className="font-semibold">Event {id}</h3>
                  <p className="text-sm text-gray-600 mb-3">Date: Nov {5 + id}, 2025</p>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                    View Registrations
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-8 border rounded-lg p-4 bg-gray-50 shadow-sm">
              <h3 className="font-semibold mb-3">Host a New Event</h3>
              <input
                type="text"
                placeholder="Event Title"
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <textarea
                rows="3"
                className="w-full border rounded-lg px-3 py-2 mb-3"
                placeholder="Event details..."
              ></textarea>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Host Event
              </button>
            </div>
          </div>
        );

      /** 🖼️ Media Section */
      case "Media":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Media & Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <img
                  key={i}
                  src={`https://source.unsplash.com/random/400x400?team,club,${i}`}
                  alt="Club Media"
                  className="rounded-lg shadow-sm hover:scale-105 transition"
                />
              ))}
            </div>
          </div>
        );

      /** 💳 Subscription Section */
      case "Subscription":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SubscriptionCard duration="1 Month" price="₹199" />
              <SubscriptionCard duration="6 Months" price="₹899" />
              <SubscriptionCard duration="1 Year" price="₹1499" />
            </div>
          </div>
        );

      /** 📩 Contact Section */
      case "Contact":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact & Support</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Club Email</label>
                <input
                  type="email"
                  placeholder="Enter your club email"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your query"
                ></textarea>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Submit
              </button>
            </form>
          </div>
        );

      default:
        return <div>Dashboard</div>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-5 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Club Panel</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-1 p-4">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => setActiveSection(item.name)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    activeSection === item.name
                      ? "bg-purple-600 shadow-lg"
                      : "hover:bg-gray-800"
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
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[85vh]">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

// 💳 Subscription Card Reusable
const SubscriptionCard = ({ duration, price }) => (
  <div className="border rounded-lg p-6 bg-gray-50 text-center shadow-sm">
    <h3 className="text-xl font-bold mb-2">{duration}</h3>
    <p className="text-lg mb-4">{price}</p>
    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
      Subscribe
    </button>
  </div>
);

export default DashboardClub;
