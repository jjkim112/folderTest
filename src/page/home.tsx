import { useNavigate } from "react-router-dom";
import "firebase/compat/firestore";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/page/home/home.css";

function HomePage() {
  return (
    <div className="relative h-full w-full flex flex-col justify-center ">
      <div className="main-container">
        <img
          src="/assets/images/wp_title.gif"
          alt="Descriptionimage"
          className="logo"
        />
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            borderRadius: 20,

            width: "70%",
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색을해보세용"
            inputProps={{ "aria-label": "검색을해보세용" }}
          />
        </Paper>
      </div>
    </div>
  );
}

const HomeTitle = () => {
  return (
    <img
      className="w-4/5 mb-12 pt-12 mx-auto"
      src="/assets/images/wp_title.gif"
      alt=""
    />
  );
};

type BasicBtnProps = {
  name: string;
  route: string;
};
const BasicBtn = ({ name, route }: BasicBtnProps) => {
  let navigate = useNavigate();
  const movePage = (route: string) => {
    navigate(route);
  };

  return (
    <button
      className="block hover:bg-red-200 shadow-xl rounded-full bg-white 
     border-2 border-gray-400 cursor-pointer px-4 py-2 mx-auto my-8"
      onClick={() => {
        movePage(route);
      }}
    >
      {name ?? ""}
    </button>
  );
};

export default HomePage;
