/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { getAllCategories } from '../../api/categoryData';

export default function AllCategoriesPage() {
  const [category, setCategory] = useState([]);

  const getCategories = () => {
    getAllCategories(category.id).then(setCategory);
  };

  useEffect(() => {
    getCategories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>Categories</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {
            category?.map((categories) => (
              <tr>
                <td> <Button>Delete</Button> <Button>Edit</Button> </td>
                <Link href={`/posts/category/${categories.id}`} passHref>
                  <td>{categories.label}</td>
                </Link>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </>
  );
}
