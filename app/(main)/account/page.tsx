import Image from "next/image";
import Button from "../../components/common/Button";

const mockUser = {
  name: "Jane Doe",
  email: "jane.doe@email.com",
  joined: "2023-01-15",
};

const Account = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row gap-8">
        {/* Profile Section */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <Image
            width={96}
            height={96}
            src='/skyzz'
            alt={mockUser.name}
            className="w-24 h-24 rounded-full border-4 border-amber-200 mb-3"
          />
          <div className="text-center md:text-left">
            <div className="text-lg font-semibold text-gray-900">
              {mockUser.name}
            </div>
            <div className="text-sm text-gray-500">{mockUser.email}</div>
            <div className="text-xs text-gray-400 mt-1">
              Joined {mockUser.joined}
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full md:w-auto">
            Edit Profile
          </Button>
        </div>
        {/* Account Details */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-amber-800 mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Full Name
              </label>
              <div className="text-gray-900 font-medium">{mockUser.name}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Email Address
              </label>
              <div className="text-gray-900 font-medium">{mockUser.email}</div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Password
              </label>
              <div className="text-gray-900 font-medium">••••••••</div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-1 px-0 text-amber-800"
              >
                Change Password
              </Button>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Member Since
              </label>
              <div className="text-gray-900 font-medium">{mockUser.joined}</div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Order History
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-500 text-sm text-center">
              No orders yet. Your order history will appear here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
