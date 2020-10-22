import { Form, Formik } from "formik";
import React, { useState } from "react";

interface MoodContainerProps {}

export const MoodContainer: React.FC<MoodContainerProps> = ({}) => {
  const [state, setState] = useState({
    seed_artists: "",
    seed_genres: "",
    seed_tracks: "",
    target_acousticness: "",
    target_danceability: "",
    target_energy: "",
    target_instrumentalness: "",
    target_key: "",
    target_liveness: "",
    target_loudness: "",
    target_mode: "",
    target_popularity: "",
    target_speechiness: "",
    target_tempo: "",
    target_time_signature: "",
    target_valence: "",
  });
  return (
    <div>
      <Formik
        initialValues={{
          seed_artists: "",
          seed_genres: "",
          seed_tracks: "",
          target_acousticness: "",
          target_danceability: "",
          target_energy: "",
          target_instrumentalness: "",
          target_key: "",
          target_liveness: "",
          target_loudness: "",
          target_mode: "",
          target_popularity: "",
          target_speechiness: "",
          target_tempo: "",
          target_time_signature: "",
          target_valence: "",
        }}
        onSubmit={(values) => console.log(values)}
      >
        <Form></Form>
      </Formik>
    </div>
  );
};
