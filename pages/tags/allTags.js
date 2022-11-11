/* eslint-disable react-hooks/exhaustive-deps */
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { React, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllTags } from '../../api/tagData';
import TagForm from '../../components/TagForm';

export default function AllTagsPage() {
  const [tag, setTag] = useState([]);

  const getTags = () => {
    getAllTags(tag.id).then(setTag);
  };

  useEffect(() => {
    getTags();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () => getTags();

  return (
    <>
      <TagForm refresh={refresh} />
      <h2>Tags</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {
            tag?.map((tags) => (
              <tr>
                <td> <Button>Delete</Button> <Button>Edit</Button> </td>
                <Link href={`/posts/tag/${tags.id}`} passHref>
                  <td>{tags.label}</td>
                </Link>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}
