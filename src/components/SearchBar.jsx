import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchContainer = styled.div`
  z-index: 3;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#ddd'};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  font-size: 14px;
`;

const ResultsList = styled.div`
  position: absolute;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#ddd'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  box-sizing: border-box;
  top: 100%;
  margin-top: 4px;
`;

const ResultItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

export default function SearchBar({ pins, setSearchQuery, setSelectedPin, flyToPin }) {

    const [searchResults, setSearchResults] = useState([]);

    // Handle search input changes
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query) {
            setSearchResults([]);
            return;
        }

        // Combine all pins into a single array for searching
        const allPins = Object.values(pins).flat();

        // Filter pins based on search query
        const results = allPins.filter(pin =>
            pin.name.toLowerCase().includes(query)
        );

        setSearchResults(results);
    };

    // Handle selection of a search result
    const handleSelect = (pin) => {
        if (pin) {
            setSelectedPin(pin);
            flyToPin(pin);
            setSearchQuery('');
            setSearchResults([]); // Clear results after selection
        }
    };

    return (
        <SearchContainer>
            <SearchInput
                type="text"
                placeholder="Search for pins..."
                onChange={handleSearch}
            />
            {searchResults.length > 0 && (
                <ResultsList>
                    {searchResults.map((pin, index) => (
                        <ResultItem
                            key={index}
                            onClick={() => handleSelect(pin)}
                        >
                            {pin.name}
                        </ResultItem>
                    ))}
                </ResultsList>
            )}
        </SearchContainer>
    );
}
SearchBar.propTypes = {
    pins: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
    setSearchQuery: PropTypes.func.isRequired,
    setSelectedPin: PropTypes.func.isRequired,
    flyToPin: PropTypes.func.isRequired
};

