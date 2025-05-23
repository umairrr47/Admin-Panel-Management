import React from 'react';
import { Calendar, Clock, Mail, MapPin, Tag, User as UserIcon } from 'lucide-react';
import { User } from '../data/dummyChats';

interface UserDetailsPanelProps {
  user: User | null;
  visible: boolean;
  onClose: () => void;
}

const UserDetailsPanel: React.FC<UserDetailsPanelProps> = ({ user, visible, onClose }) => {
  if (!visible || !user) {
    return null;
  }

  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 z-30 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-800">Contact Details</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>
            {user.company && (
              <p className="text-sm text-gray-600">{user.company}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <Mail className="w-4 h-4 text-gray-500 mt-0.5 mr-3" />
            <div>
              <p className="text-xs font-medium text-gray-700">Email</p>
              <a href={`mailto:${user.email}`} className="text-sm text-indigo-600 hover:underline">
                {user.email}
              </a>
            </div>
          </div>

          {user.lastSeen && (
            <div className="flex items-start">
              <Clock className="w-4 h-4 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-xs font-medium text-gray-700">Last Active</p>
                <p className="text-sm text-gray-700">{user.lastSeen}</p>
              </div>
            </div>
          )}

          {user.company && (
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-3" />
              <div>
                <p className="text-xs font-medium text-gray-700">Company</p>
                <p className="text-sm text-gray-700">{user.company}</p>
              </div>
            </div>
          )}

          <div className="flex items-start">
            <Calendar className="w-4 h-4 text-gray-500 mt-0.5 mr-3" />
            <div>
              <p className="text-xs font-medium text-gray-700">Customer Since</p>
              <p className="text-sm text-gray-700">September 2023</p>
            </div>
          </div>

          <div className="flex items-start">
            <Tag className="w-4 h-4 text-gray-500 mt-0.5 mr-3" />
            <div>
              <p className="text-xs font-medium text-gray-700">Tags</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {user.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-0.5 bg-gray-100 text-gray-800 text-xs rounded"
                  >
                    {tag}
                  </span>
                ))}
                {user.isVIP && (
                  <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded">
                    VIP
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Recent Activity</h3>
          <div className="space-y-2">
            <div className="text-xs text-gray-600 pb-2 border-b border-gray-100">
              <p className="font-medium">Subscription Upgraded</p>
              <p className="text-gray-500">2 weeks ago</p>
            </div>
            <div className="text-xs text-gray-600 pb-2 border-b border-gray-100">
              <p className="font-medium">Reported API Issue</p>
              <p className="text-gray-500">3 weeks ago</p>
            </div>
            <div className="text-xs text-gray-600">
              <p className="font-medium">Onboarding Completed</p>
              <p className="text-gray-500">1 month ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPanel;