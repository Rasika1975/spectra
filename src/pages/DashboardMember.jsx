import { useState } from "react";
import {
  Home,
  User,
  Image as ImageIcon,
  Calendar,
  Users,
  CreditCard,
  Mail,
  LogOut,
  Upload,
} from "lucide-react";

const DashboardMember = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");

  const sidebarItems = [
    { name: "Dashboard", icon: Home },
    { name: "My Profile", icon: User },
    { name: "Posts", icon: ImageIcon },
    { name: "Events", icon: Calendar },
    { name: "Clubs", icon: Users },
    { name: "Subscription", icon: CreditCard },
    { name: "Contact", icon: Mail },
    { name: "Logout", icon: LogOut },
  ];

  const renderSection = () => {
    switch (activeSection) {
      // 🏠 Dashboard Overview
      case "Dashboard":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StatCard label="Joined Clubs" value="2" />
              <StatCard label="Events Registered" value="3" />
              <StatCard label="Photos Uploaded" value="10" />
            </div>
          </div>
        );

      // 👤 My Profile
      case "My Profile":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile & Verification</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">College Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your college name"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Upload College ID</label>
                <input
                  type="file"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Contact Number (OTP Verify)</label>
                <input
                  type="tel"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter contact number"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Social Links</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="LinkedIn / Instagram URL"
                />
              </div>

              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Save Details
              </button>
            </form>
          </div>
        );

      // 📸 Posts
     // 📸 Posts
case "Posts":
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Post Management</h2>

      {/* New LinkedIn-like Post Input Section */}
      <div className="border rounded-lg p-5 mb-8 bg-gray-50 shadow-sm">
        <h3 className="font-semibold mb-3">Create a New Post</h3>
        <textarea
          className="w-full border rounded-lg px-3 py-2 mb-3"
          placeholder="What's on your mind?"
          rows="3"
        ></textarea>

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <Upload className="w-5 h-5 text-purple-600" />
              <input type="file" className="hidden" />
              <span className="text-sm text-gray-700">Add Photo</span>
            </label>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-700">Visibility:</label>
              <select className="border rounded-lg px-2 py-1 text-sm">
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed Section */}
      <div>
        <h3 className="font-semibold mb-3">My Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              img: "https://source.unsplash.com/random/300x200?tech",
              caption: "Exploring the latest AI innovations at Spectra!",
            },
            {
              id: 2,
              img: "https://source.unsplash.com/random/300x200?community",
              caption: "Amazing moments with our club members 💜",
            },
            {
              id: 3,
              img: "https://source.unsplash.com/random/300x200?college",
              caption: "Our first offline event was a blast!",
            },
            {
              id: 4,
              img: "https://source.unsplash.com/random/300x200?learning",
              caption: "New blog post published on ML trends 🚀",
            },
          ].map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition"
            >
              <img
                src={post.img}
                alt={`Post ${post.id}`}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <p className="text-gray-700 text-sm mb-3">{post.caption}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>❤️ 24 Likes</span>
                <button className="text-red-500 hover:underline">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

      // 🎟️ Events
      case "Events":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Events Section</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EventCard
                title="TechFest 2025"
                date="Nov 5, 2025"
                joined={false}
              />
              <EventCard title="AI Hackathon" date="Dec 2, 2025" joined />
            </div>
          </div>
        );

      // 🤝 Clubs
      case "Clubs":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Clubs / Communities</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ClubCard name="Spectra AI Club" joined />
              <ClubCard name="Design Innovators" />
            </div>
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Create a New Club</h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                Create Club
              </button>
            </div>
          </div>
        );

      // 💳 Subscription
      case "Subscription":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Subscription Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <SubscriptionCard duration="1 Month" price="₹99" />
              <SubscriptionCard duration="6 Months" price="₹499" />
              <SubscriptionCard duration="1 Year" price="₹899" />
            </div>
          </div>
        );

      // 📬 Contact
      case "Contact":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact & Support</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your query"
                  rows="4"
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
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Member Panel</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2 p-4">
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
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

// Small reusable components 👇
const StatCard = ({ label, value }) => (
  <div className="bg-purple-100 text-purple-800 rounded-lg p-4 text-center shadow-sm">
    <h3 className="text-lg font-semibold">{label}</h3>
    <p className="text-2xl font-bold mt-1">{value}</p>
  </div>
);

const EventCard = ({ title, date, joined }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
    <h3 className="font-semibold">{title}</h3>
    <p className="text-sm text-gray-600 mb-2">{date}</p>
    <button
      className={`px-4 py-2 rounded-lg ${
        joined
          ? "bg-green-600 text-white"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
    >
      {joined ? "Joined" : "Join Event"}
    </button>
  </div>
);

const ClubCard = ({ name, joined }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
    <h3 className="font-semibold mb-2">{name}</h3>
    <button
      className={`px-4 py-2 rounded-lg ${
        joined
          ? "bg-green-600 text-white"
          : "bg-purple-600 text-white hover:bg-purple-700"
      }`}
    >
      {joined ? "Joined" : "Join Club"}
    </button>
  </div>
);

const SubscriptionCard = ({ duration, price }) => (
  <div className="border rounded-lg p-6 shadow-sm bg-gray-50 text-center">
    <h3 className="text-xl font-bold mb-2">{duration}</h3>
    <p className="text-lg mb-4">{price}</p>
    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
      Subscribe
    </button>
  </div>
);

export default DashboardMember;
