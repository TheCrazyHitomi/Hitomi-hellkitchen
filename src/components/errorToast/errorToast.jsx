import "./errorToast.css";

const ErrorToast = ({ formErrors }) => {



  return (
    <>
  {formErrors.length > 0 && (
    <div className="overlay active">
        <dialog className=" modal tertiary-container" open>
          <h4>Erreurs :</h4>
          <ol className="error-list">
            {formErrors.map((error, index) => (
              <li  key={index}>{error}</li>
            ))}
          </ol>
        </dialog>
    </div>
  )}
  </>
)};


export default ErrorToast;