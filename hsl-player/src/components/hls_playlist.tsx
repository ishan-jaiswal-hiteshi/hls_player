const Playlist_Page = () => {
  return (
    <div className="">
      <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400">
        <li>
          Playlist 1
          <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
            <li>Song 1</li>
            <li>Song 2</li>
            <li>Song 3</li>
          </ul>
        </li>
        <li>
          List item two
          <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
            <li>
              I'm not sure if we'll bother styling more than two levels deep.
            </li>
            <li>
              Two is already too much, three is guaranteed to be a bad idea.
            </li>
            <li>If you nest four levels deep you belong in prison.</li>
          </ul>
        </li>
        <li>
          List item three
          <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
            <li>Again please don't nest lists if you want</li>
            <li>Nobody wants to look at this.</li>
            <li>I'm upset that we even have to bother styling this.</li>
          </ul>
        </li>
      </ol>
    </div>
  );
};

export default Playlist_Page;
