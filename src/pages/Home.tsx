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
import { useEffect, useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [playlists, setPlaylists] = useState<Playlists>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const [tracks, setTracks] = useState<Tracks>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pageData, setPageData] = useState<Tracks>([]);
  const [userProfile, setUserProfile] = useRecoilState(userProfileAtom);
  const [sidebarState, setSidebarState] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthenticated(localStorage.getItem("token") !== null);
  }, [authenticated]);

  useLayoutEffect(() => {
    (async () => {
      if (authenticated) {
        return;
      }
      const hash = window.location.search;

      const code = hash.substring(1).split("=")[1];
      if (!code) return;

      const [accessToken, refreshToken] = await getTokens(code);
      window.location.search = "";
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("token", accessToken);
      setAuthenticated(true);
    })();
  }, [authenticated, location]);

  useLayoutEffect(() => {
    (async () => {
      if (!authenticated) return;
      const token = localStorage.getItem("token");
      if (token === "" || !token) return;
      const playlists = await getPlaylists(token);
      const profile = await getProfile(token);
      setPlaylists(playlists);
      setUserProfile(profile);
    })();
  }, [authenticated, setUserProfile]);

  useLayoutEffect(() => {
    (async () => {
      if (!authenticated) return;
      const token = localStorage.getItem("token");
      if (selectedPlaylist === "" || token === "" || !token) return;
      const pTracks = await getPlaylistTracks(token, selectedPlaylist);
      setTotalPages(Math.ceil(pTracks.length / 10));
      setTracks(pTracks);
    })();
  }, [authenticated, selectedPlaylist]);

  useLayoutEffect(() => {
    if (!authenticated) return;
    if (tracks.length === 0) return;
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    setPageData(tracks.slice(start, end));
  }, [currentPage, tracks, authenticated]);

  useLayoutEffect(() => {
    if (!authenticated) return;
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
  }, [authenticated, search, tracks, currentPage]);

  const logout = () => {
    setAuthenticated(false);
    setPlaylists([]);
    setSelectedPlaylist("");
    setTracks([]);
    setTotalPages(0);
    setCurrentPage(1);
    setSearch("");
    setPageData([]);
    setUserProfile({} as UserProfile);
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen min-w-screen">
      {!authenticated ? (
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
        </div>
      )}
    </div>
  );
};

export default HomePage;
