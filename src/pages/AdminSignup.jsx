// Admin signup page has been intentionally disabled.
// This component remains to avoid import errors in older builds but
// the route to this page has been removed and public admin signup
// is no longer allowed. Admin accounts must be created by system
// administrators directly in the database or via secured admin tools.

const AdminSignup = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
    <div className="p-8 bg-black/60 rounded-lg border border-red-500/20">
      <h2 className="text-2xl font-bold mb-4">Admin signup disabled</h2>
      <p className="text-sm text-gray-400">Admin accounts cannot be created via the public site. Please contact a system administrator.</p>
    </div>
  </div>
);

export default AdminSignup;
