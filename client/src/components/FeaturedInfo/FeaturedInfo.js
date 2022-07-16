import "./FeaturedInfo.css";
import { HiOutlineCurrencyDollar, HiOutlineLibrary } from "react-icons/hi";
import { Fragment } from "react";
export default function FeaturedInfo(props) {
  return (
    <Fragment>
      <div className="title">Account Summary</div>
      <div className="featured">
        <div className="featuredItem">
          <HiOutlineCurrencyDollar />
          <span className="featuredTitle">Points</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${props.points}</span>
          </div>
        </div>

        <div className="featuredItem">
          <HiOutlineLibrary />
          <span className="featuredTitle">Withdrawn</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">${props.withdrawalBalance}</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
