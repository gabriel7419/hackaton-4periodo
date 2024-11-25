
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TablePosition from '../../components/Tables/tables/TablePosition';

const Tables = () => {
  return (
    <>
      {/* Breadcrumb for navigation */}
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* Table component */}
        <TablePosition />
      </div>
    </>
  );
};

export default Tables;