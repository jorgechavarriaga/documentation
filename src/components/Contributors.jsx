import { useEffect, useState } from 'react';
import Image from 'next/image'
import { getProfiles } from 'services/get-profiles';

export function Contributors({users, mode}) {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const profiles = await getProfiles(users);
        setListUsers(profiles);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    }

    fetchProfiles();
  }, []);

  if (!listUsers.length) return <div className='min-h-[30px]'></div>;

  return (
    <div className='place-content-center'>
      <ul className='flex flex-wrap gap-2 p-0 m-0'>
        {listUsers.map((contributor) => (
          <li key={'contributor-'+contributor.id} className='list-none p-0 m-0 flex gap-2 bg-gray-100 dark:bg-white/2.5 dark:ring-1 dark:ring-white/10 rounded-2xl'>
            <a href={contributor.profile} target='_blank'>
            <Image
              src={contributor.avatar}
              alt={contributor.name}
              width={30}
              height={30}
              className="rounded-full hover:shadow-md transition-all shadow-slate-400 m-0 bg-fuchsia-200"
            />
            </a>
            {!mode ? <></> : <span className='lowercase mr-3'>{contributor.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
