import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);

  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, [getUserByToken]);

  console.log('user', user);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {user && (
        <div className="space-y-2">
          <p className="text-lg">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Register Date:</span>{' '}
            {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
