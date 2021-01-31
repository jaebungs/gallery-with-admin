import React from 'react';
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <div>
        <h1>Something is wrong.</h1>
        <Link to='/'>Go back to the gallery.</Link>
    </div>
)

export default NotFoundPage;