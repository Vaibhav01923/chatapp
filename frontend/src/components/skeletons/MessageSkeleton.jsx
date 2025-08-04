const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          } mb-4`}
        >
          <div
            className={`flex ${
              idx % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } items-end space-x-2 max-w-xs lg:max-w-md`}
          >
            {/* Avatar skeleton */}
            <div className="w-10 h-10 rounded-full bg-gray-700/50 animate-pulse flex-shrink-0" />

            <div
              className={`flex flex-col ${
                idx % 2 === 0 ? "items-start" : "items-end"
              } space-y-1`}
            >
              {/* Username skeleton */}
              <div className="h-3 w-16 bg-gray-600/60 rounded animate-pulse" />

              {/* Message bubble skeleton */}
              <div
                className={`h-16 w-48 bg-gray-700/60 rounded-lg animate-pulse ${
                  idx % 2 === 0 ? "rounded-bl-none" : "rounded-br-none"
                }`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
