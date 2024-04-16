import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';

function InfoForm({
  emailServiceID,
  emailTemplateID,
  emailUserID,
  emailSuccessMessage,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const form = useRef();

  const YOUR_SERVICE_ID = emailServiceID ? emailServiceID : 'service_uslk1aw';
  const YOUR_TEMPLATE_ID = emailTemplateID
    ? emailTemplateID
    : 'template_ol38l5l';
  const YOUR_USER_ID = emailUserID ? emailUserID : 'user_6YrwiI2nth12MMxW25bxB';

  const sendEmail = () => {
    emailjs
      .sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, YOUR_USER_ID)
      .then(
        (result) => {
          if (result.text === 'OK') {
            setIsSubmitSuccess(true);
          }
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  useEffect(() => {
    if (isSubmitSuccess) {
      reset({});
    }
  }, [isSubmitSuccess, reset]);

  return (
    <>
      <form ref={form} className="info-form" onSubmit={handleSubmit(sendEmail)}>
        <div className="field">
          <label htmlFor="property_name" className="screen-reader-only">
            property name
          </label>
          <input
            type="text"
            placeholder="property name"
            tabIndex="1"
            {...register('property_name', { required: true })}
          />
          {errors.property_name && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="location" className="screen-reader-only">
            location
          </label>
          <input
            type="text"
            placeholder="location"
            tabIndex="2"
            {...register('location', { required: true })}
          />
          {errors.location && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="field">
          <label
            htmlFor="artist_designer_architect"
            className="screen-reader-only"
          >
            artist / designer / architect
          </label>
          <input
            type="text"
            placeholder="artist / designer / architect"
            tabIndex="3"
            {...register('artist_designer_architect', { required: true })}
          />
          {errors.artist_designer_architect && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="field input-80">
          <label htmlFor="your_name" className="screen-reader-only">
            your name
          </label>
          <input
            type="text"
            placeholder="your name"
            tabIndex="4"
            {...register('your_name', { required: true })}
          />
          {errors.your_name && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="field input-80">
          <label htmlFor="note" className="screen-reader-only">
            note
          </label>
          <textarea
            rows="10"
            className="textarea-field t-l-1"
            placeholder="NOTE..."
            tabIndex="5"
            {...register('note')}
          />
        </div>
        <input
          type="submit"
          value="submit"
          className="submit-button btn cta t-l-1"
        />
        {isSubmitSuccess && (
          <p className="success-message">
            {emailSuccessMessage ? emailSuccessMessage : 'Contribute Success!'}
          </p>
        )}
      </form>

      <style jsx>{`
        .success-message {
          float: right;
        }
        input[type='text'],
        textarea {
          background-color: transparent;
          width: 100%;
          box-sizing: border-box;
          padding: 0 var(--s-16);
        }
        .info-form {
          padding-top: var(--s-30);
          padding-bottom: var(--s-30);
        }
        .field {
          &.input-80 {
            width: 80%;
          }
        }
      `}</style>
    </>
  );
}

export default InfoForm;
