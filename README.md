# The Nature of Code 2nd Edition

This repo contains all the files for the Nature of Code 2nd edition. The book is now being authored in Notion and imported here as raw HTML files (which are then used to build the print PDF and gatsby website). 

Following are the steps to build the book and website, however, you will have to skip the `import-notion-docs` as that can only be done with the Notion API key associated with the book. You can find the latest HTML version of the book in `/content`.

```bash
# Install Dependencies
npm install

# Import Notion Pages
npm run import-notion-docs

# Build PDF (Magicbook)
npm run build:pdf

# Build Website
npm run build
```
