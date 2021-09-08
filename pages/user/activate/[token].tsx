import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import Layout from '../../../components/Layout';

const Activate = () => {
  const router = useRouter();
  const { token } = router.query;

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(
            `${process.env.API_ROOT}/user/activation`,
            {
              activationToken: token
            }
          );
          setSuccess(res.data.message);
        } catch (err) {
          err.response.data.message && setError(err.response.data.message);
        }
      };
      activationEmail();
    }
  }, [token]);

  return (
    <Layout>
      <div className="active_page">
        {error && (
          <div
            className="alert alert-error alert-dismissible fade show"
            role="alert"
          >
            <strong>{error}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        {success && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>{success}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Activate;
