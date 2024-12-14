export const getClassColor = (color: string) => {
  switch (color) {
    case 'red':
      return 'bg-red-500';
    case 'blue':
      return 'bg-blue-500';
    case 'green':
      return 'bg-green-500';
    case 'yellow':
      return 'bg-yellow-500';
    case 'purple':
      return 'bg-purple-500';
    case 'rose':
      return 'bg-rose-300';
    case 'indigo':
      return 'bg-indigo-500';
    case 'gray':
      return 'bg-gray-400';
    default:
      return 'bg-red-500';
  }
};

export const getClassStatus = (status: string) => {
  switch (status) {
    case 'received':
      return 'bg-status-bg-received text-status-text-received';
    case 'printing':
      return 'bg-status-bg-printing text-status-text-printing';
    case 'finished':
      return 'bg-status-bg-finished text-status-text-finished';
    case 'delivered':
      return 'bg-status-bg-delivered text-status-text-delivered';;
    case 'archived':
      return 'bg-status-bg-archived text-status-text-archived';
    case 'impeded':
      return 'bg-status-bg-impeded text-status-text-impeded';
    default:
      return '';
  }
}
