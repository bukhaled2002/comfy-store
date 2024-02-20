import { useNavigation } from "react-router-dom";

function SubmitBtn({ text }) {
  const navigation = useNavigation();
  let isSubmitting = navigation.state === "submitting";
  console.log("done");
  return (
    <button
      type="submit"
      className="btn btn-primary btn-block"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <span className="loading loading-spinner"></span>sending
        </>
      ) : (
        text || "submit"
      )}
    </button>
  );
}

export default SubmitBtn;
