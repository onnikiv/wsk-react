import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {fetchData} from '../utils/fetchData';

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const [selectedItem, setSelectedItem] = useState(null);
  console.log('selectedItem', selectedItem);

  const getMedia = async () => {
    try {
      const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
      console.log(json);

      const authApi = import.meta.env.VITE_AUTH_API;
      console.log(json);

      const newArray = await Promise.all(
        json.map(async (item) => {
          const result = await fetchData(authApi + '/users/' + item.user_id);
          return {...item, username: result.username};
        }),
      );

      console.log(newArray);

      setMediaArray(newArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);
  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow
              key={item.media_id}
              item={item}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};
export default Home;
