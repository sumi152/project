export const isPrime = (num) => {
  const number = parseInt(num);
  if (isNaN(number) || number <= 1) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
};

export const processArray = (arr) => {
  const numbers = [];
  const alphabets = [];
  let highestLowercase = '';
  let hasPrime = false;

  arr.forEach(item => {
    if (/^\d+$/.test(item)) {
      numbers.push(item);
      if (isPrime(item)) hasPrime = true;
    } else if (/^[A-Za-z]$/.test(item)) {
      alphabets.push(item);
      if (/[a-z]/.test(item) && item > highestLowercase) {
        highestLowercase = item;
      }
    }
  });

  return {
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
    is_prime_found: hasPrime
  };
};

export const validateFile = (fileB64) => {
  if (!fileB64) return { file_valid: false };

  try {
    const buffer = Buffer.from(fileB64, 'base64');
    const mime = buffer[0] === 0xff && buffer[1] === 0xd8 ? 'image/jpeg'
      : buffer[0] === 0x89 && buffer[1] === 0x50 ? 'image/png'
      : buffer[0] === 0x25 && buffer[1] === 0x50 ? 'application/pdf'
      : 'application/octet-stream';

    return {
      file_valid: true,
      file_mime_type: mime,
      file_size_kb: (buffer.length / 1024).toFixed(2)
    };
  } catch (error) {
    return { file_valid: false };
  }
};