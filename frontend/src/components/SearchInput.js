import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';

const SearchInput = () => {
  return (
    <Form inline="true" className="cr-search-form" onSubmit={e => e.preventDefault()}>
      <MdSearch
        size="20"
        className="cr-search-form__icon-search text-secondary mt-2"
      />
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
      />
    </Form>
  );
};

export default SearchInput;
