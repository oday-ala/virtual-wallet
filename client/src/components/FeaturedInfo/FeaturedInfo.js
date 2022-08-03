import "./FeaturedInfo.css";
import CurrencyPoundIcon from "@mui/icons-material/CurrencyPound";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { Fragment } from "react";
export default function FeaturedInfo(props) {
  return (
    <Fragment>
      <div className="title">Account Summary</div>
      <div className="featured">
        <div className="featuredItem">
          <CurrencyPoundIcon />
          <span className="featuredTitle">Points</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney"> {props.points}</span>
          </div>
        </div>

        <div className="featuredItem">
          <ChangeCircleIcon />
          <span className="featuredTitle">In Rupees</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney"> ₹ {props.points}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
