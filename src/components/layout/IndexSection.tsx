import React from 'react';
import PageCard from './PageCard';

interface Page {
  code: string;
  title: string;
  description: string;
  to: string;
  type: 'CORE' | 'ADV' | 'MGT';
}

interface IndexSectionProps {
  title: string;
  pages: Page[];
}

const IndexSection: React.FC<IndexSectionProps> = ({ title, pages }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-6 border-b pb-2">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pages.map((page) => (
          <PageCard
            key={page.code}
            code={page.code}
            title={page.title}
            description={page.description}
            to={page.to}
            type={page.type}
          />
        ))}
      </div>
    </section>
  );
};

export default IndexSection;
