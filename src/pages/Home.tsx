import { userProfileAtom } from "@/atoms/userProfileAtom";
import LoginForm from "@/components/LoginForm";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import {
  getPlaylists,
  getPlaylistTracks,
  getTokens,
  getProfile,
} from "@/lib/functions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";

const HomePage = () => {
  const [token, setToken] = useState("");
  const [playlists, setPlaylists] = useState<Playlists>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [tracks, setTracks] = useState<Tracks>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageData, setPageData] = useState<Tracks>([]);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [sidebarState, setSidebarState] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token") as string);
        return;
      }
      const hash = window.location.search;

      const code = hash.substring(1).split("=")[1];
      console.log("Code", code);

      const [accessToken, refreshToken] = await getTokens(code);
      window.location.search = "";
      setToken(accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("token", accessToken);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (token === "" || !token) return;
      const playlists = await getPlaylists(token);
      const profile = await getProfile(token);
      setPlaylists(playlists);
      setUserProfile(profile);
    })();
  }, [token, setUserProfile]);

  useEffect(() => {
    (async () => {
      if (selectedPlaylist === "" || token === "" || !token) return;
      const pTracks = await getPlaylistTracks(token, selectedPlaylist);
      setTotalPages(Math.ceil(pTracks.length / 10));
      setTracks(pTracks);
    })();
  }, [selectedPlaylist, token]);

  useEffect(() => {
    if (tracks.length === 0) return;
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    setPageData(tracks.slice(start, end));
  }, [currentPage, token, tracks]);

  useEffect(() => {
    if (search === "") {
      const start = (currentPage - 1) * 10;
      const end = start + 10;
      setPageData(tracks.slice(start, end));
      return;
    }
    const filteredTracks = tracks.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );
    setPageData(filteredTracks);
  }, [search, tracks, currentPage]);

  const logout = () => {
    setToken("");
    setPlaylists([]);
    setSelectedPlaylist("");
    setTracks([]);
    setTotalPages(0);
    setCurrentPage(1);
    setSearch("");
    setPageData([]);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen min-w-screen">
      {!token ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <LoginForm />
        </div>
      ) : (
        <div>
          <main className="flex">
            <Sidebar
              playlists={playlists}
              setPlaylistId={setSelectedPlaylist}
              sidebarState={sidebarState}
            />
            <Main
              playlistId={selectedPlaylist}
              playlists={playlists}
              tracks={tracks}
              currentPage={currentPage}
              pageData={pageData}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              search={search}
              setSearch={setSearch}
              logout={logout}
              userProfile={userProfile}
              sidebarState={sidebarState}
              setSidebarState={setSidebarState}
            />
          </main>
          {/* <button onClick={logout}>Logout</button> */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
