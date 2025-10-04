export function DocsNavbar() {
  return (
    <nav className="flex h-[60px] justify-center bg-white sm:h-[70px] md:h-[80px]">
      <div className="flex min-w-0 grow items-center border-b border-gray-200 px-5">
        <a href="/" className="flex items-center">
          <img
            src="/logo.svg"
            loading="eager"
            alt="Log Bull logo"
            width="35"
            height="35"
            className="flex-shrink-0 sm:h-[40px] sm:w-[40px] md:h-[50px] md:w-[50px]"
          />

          <div className="ml-2 select-none text-lg font-bold sm:ml-3 sm:text-xl md:ml-4 md:text-2xl">
            Log Bull
          </div>
        </a>

        <div className="ml-auto mr-4 hidden gap-3 sm:mr-6 md:mr-10 lg:flex lg:gap-5">
          <a className="hover:opacity-70" href="https://t.me/logbull_community" target="_blank">
            Community
          </a>
        </div>

        <a
          className="ml-auto lg:ml-0"
          href="https://github.com/logbull/logbull"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center rounded-lg border border-gray-200 bg-[#f5f7f9] px-2 py-1 hover:bg-gray-100 md:px-4 md:py-2">
            <img
              src="/github.svg"
              className="mr-1 h-4 w-4 sm:mr-2 md:mr-3"
              alt="GitHub icon"
              width="16"
              height="16"
              loading="eager"
            />
            <span className="text-sm sm:text-base">
              Star on GitHub
              <span className="hidden sm:inline">, it&apos;s really important ❤️</span>
            </span>
          </div>
        </a>
      </div>
    </nav>
  );
}
