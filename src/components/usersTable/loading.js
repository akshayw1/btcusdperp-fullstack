const LoadingToast = ({ text = "Updating user..." }) => (
  <div className="loading-toast">
    <div className="loading-circle"></div>
    <div>{text}</div>
  </div>
);
export default LoadingToast;
