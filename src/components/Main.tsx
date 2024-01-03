import { useLayoutEffect, useState } from "react";
import UserPill from "./UserPill";
import { shuffle } from "lodash";
import TrackItem from "./TrackItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Table, TableHeader, TableRow, TableHead, TableBody } from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import Search from "./Search";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { currentTrack } from "@/atoms/trackAtom";
import SidebarMenuTrigger from "./SidebarMenuTrigger";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

type Props = {
  playlistId: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  tracks: Tracks;
  pageData: Tracks;
  playlists: Playlists;
  search: string;
  setSearch: (search: string) => void;
  logout: () => void;
  userProfile: UserProfile;
  sidebarState: boolean;
  setSidebarState: (sidebarState: boolean) => void;
};

const Main = ({
  playlistId,
  playlists,
  pageData,
  currentPage,
  setCurrentPage,
  totalPages,
  search,
  setSearch,
  logout,
  tracks,
  userProfile,
  sidebarState,
  setSidebarState,
}: Props) => {
  const navigate = useNavigate();
  const [color, setColor] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCurrentTrack] = useRecoilState(currentTrack);
  useLayoutEffect(() => {
    setColor(shuffle(colors).pop() as string);
    setCurrentPlaylist(playlists.find((p) => p.id === playlistId));
  }, [playlistId, playlists]);

  const goToTrack = (trackId: string) => {
    setCurrentTrack(tracks.find((t) => t.id === trackId) as Track);
    navigate(`/track/${trackId}`);
  };

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <UserPill
          name={userProfile.name}
          image_url={userProfile.image_url}
          logout={logout}
        />
      </header>

      <section className="absolute top-5 right-20">
        <SidebarMenuTrigger
          setSidebarState={setSidebarState}
          sidebarState={sidebarState}
        />
      </section>

      <section
        className={`flex items-start space-x-7 bg-gradient-to-b to-secondary ${color} h-64 text-white p-8 w-full`}
      >
        {currentPlaylist ? (
          <>
            <img
              className="h-44 w-44 shadow-2xl"
              src={currentPlaylist?.image_url}
              alt={currentPlaylist?.name}
            />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
                {currentPlaylist?.name}
              </h1>
              <p className="text-sm md:text-base xl:text-lg">
                {currentPlaylist?.num_tracks} Songs
              </p>
            </div>
          </>
        ) : (
          <h2 className="text-4xl font-bold items-center text-center">
            Choose a Playlist
          </h2>
        )}
      </section>
      {/* Tracks */}
      <ScrollArea className="px-6 mt-4">
        <Search search_term={search} setSearchTerm={setSearch} />
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Artist</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData && pageData.length > 0 &&
              pageData.map((t, i) => (
                <TrackItem
                  key={i}
                  s_no={currentPage * 10 - 10 + i + 1}
                  name={t.name}
                  image_url={t.image_url}
                  artist={t.artist}
                  album={t.album}
                  onClick={() => goToTrack(t.id)}
                />
              ))}
          </TableBody>
        </Table>
        {totalPages > 0 && (
          <Pagination>
            <PaginationContent>
              {currentPage !== 1 && (
                <PaginationPrevious
                  onClick={() => setCurrentPage(currentPage - 1)}
                />
              )}
              {currentPage > 3 ? (
                <>
                  <PaginationLink
                    onClick={() => setCurrentPage(1)}
                    href="#"
                    isActive={currentPage === 1}
                  >
                    1
                  </PaginationLink>
                  <PaginationLink
                    onClick={() => setCurrentPage(2)}
                    href="#"
                    isActive={currentPage === 2}
                  >
                    2
                  </PaginationLink>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages)}
                    href="#"
                    key={totalPages}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </>
              ) : (
                <>
                  {Array(totalPages)
                    .fill(1)
                    .map((_, i) => (
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        href="#"
                        key={i}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    ))}
                </>
              )}
              {currentPage !== totalPages && (
                <PaginationNext
                  onClick={() => setCurrentPage(currentPage + 1)}
                />
              )}
            </PaginationContent>
          </Pagination>
        )}
      </ScrollArea>
    </div>
  );
};

export default Main;
