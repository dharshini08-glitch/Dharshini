import { SearchInput } from './SearchInput';

type NavbarProps = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export function Navbar({ searchText, onSearchTextChange, darkMode, onToggleDarkMode }: NavbarProps) {
  return (
    <header className="top-toolbar">
      <div className="toolbar-title">
        <span>GameHub</span>
      </div>

      <div className="toolbar-actions">
        <SearchInput value={searchText} onChange={onSearchTextChange} onSearch={onSearchTextChange} />
        <button type="button" className="secondary-button" onClick={onToggleDarkMode}>
          {darkMode ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>
    </header>
  );
}
