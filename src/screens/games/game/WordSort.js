import React, {useState, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Button,
  Alert,
  Dimensions,
} from 'react-native';
import {images, icons, colors, fontSizes} from '../../../constants';
import {UIHeader, Icon, MiddleSingleMediumButton} from '../../../components';

export default GameWordSort = props => {
  const {navigate, goBack} = props.navigation;
  const {width, height} = Dimensions.get('window');

  // State
  const [difficulty, setDifficulty] = useState(null); // Độ khó
  const [availableItems, setAvailableItems] = useState([]); // Danh sách chữ cái
  const [targetLetter, setTargetLetter] = useState(''); // Mục tiêu hiện tại
  const [targetProgress, setTargetProgress] = useState(30); // Mục tiêu tiến độ
  const [progress, setProgress] = useState(0); // Thanh tiến độ
  const [sortingMatrix, setSortingMatrix] = useState(
    Array(6).fill(Array(4).fill(null)),
  ); // Ma trận Sorting
  const [waitingMatrix, setWaitingMatrix] = useState(
    Array(1).fill(Array(3).fill(null)),
  ); // Ma trận Waiting
  const [choosingCell, setChoosingCell] = useState([0, 0]); // Ô đang được chọn [Row, Col]
  const [isWaitingChosen, setIsWaitingChosen] = useState(false); // Ô được chọn trước đó là của Sorting hay Waiting

  //#region ** Cần đẩy xuống Back End **

  // Chọn độ khó
  const handleDifficultySelection = level => {
    let items;
    if (level === 'easy') items = ['A', 'E', 'X'];
    else if (level === 'medium') items = ['A', 'B', 'E', 'G', 'M', 'X', 'Z'];
    else if (level === 'hard')
      items = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'K', 'M'];

    setDifficulty(level);
    setAvailableItems(items);
    setTargetLetter(items[Math.floor(Math.random() * items.length)]);
    initializeMatrices(items);
  };

  // Khởi tạo ma trận Sorting và Waiting
  const initializeMatrices = items => {
    // Tạo ngẫu nhiên Sorting
    const newSorting = Array(6)
      .fill(null)
      .map(() =>
        Array(4)
          .fill(null)
          .map(() =>
            Math.random() < 0.3 ? generateRandomLetters(items, 1, 5) : null,
          ),
      );

    // Tạo Waiting
    const newWaiting = Array(1)
      .fill(null)
      .map(() =>
        Array(3)
          .fill(null)
          .map(() => generateRandomLetters(items, 1, 4)),
      );

    setSortingMatrix(newSorting);
    setWaitingMatrix(newWaiting);
  };

  // Sinh mảng chữ cái ngẫu nhiên
  const generateRandomLetters = (items, min, max) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array(count)
      .fill(null)
      .map(() => items[Math.floor(Math.random() * items.length)]);
  };

  // Di chuyển ô từ Waiting sang Sorting
  const moveLetter = (fromRow, fromCol, toRow, toCol) => {
    const newSorting = [...sortingMatrix];
    const newWaiting = [...waitingMatrix];

    if (!newSorting[toRow][toCol]) {
      newSorting[toRow][toCol] = newWaiting[fromRow][fromCol];
      newWaiting[fromRow][fromCol] = null;
      setSortingMatrix(newSorting);
      setWaitingMatrix(newWaiting);
    }
  };

  // Xử lý khi chọn ô thuộc Sorting
  const handlePressSorting = (rowIndex, colIndex) => {
    if (isWaitingChosen)
      moveLetter(choosingCell[0], choosingCell[1], rowIndex, colIndex);
    setIsWaitingChosen(false);
  };

  // Xử lý khi chọn ô thuộc Waiting
  const handlePressWaiting = (rowIndex, colIndex) => {
    setChoosingCell([rowIndex, colIndex]);
    setIsWaitingChosen(true);
  };

  // Kiểm tra trạng thái hoàn thiện của ô
  const checkCompletion = () => {
    sortingMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell && cell.length === 6 && new Set(cell).size === 1) {
          if (cell[0] === targetLetter) {
            setProgress(prev => prev + 6);
          }

          // Xóa ô hoàn thiện
          const newSorting = [...sortingMatrix];
          newSorting[rowIndex][colIndex] = null;
          setSortingMatrix(newSorting);
        }
      });
    });
  };

  // Tìm ô liền kề 4 hướng
  const getAdjacentCells = (rowIndex, colIndex, matrix) => {
    const directions = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];

    return directions
      .map(([dr, dc]) => [rowIndex + dr, colIndex + dc])
      .filter(
        ([r, c]) =>
          r >= 0 && c >= 0 && r < matrix.length && c < matrix[0].length,
      );
  };

  // Lấy chữ cái từ ô liền kề
  const absorbLetters = (rowIndex, colIndex) => {
    let targetCell = sortingMatrix[rowIndex][colIndex];
    if (!targetCell) return;

    let hasAbsorbed = true;
    while (hasAbsorbed && targetCell.length < 6) {
      hasAbsorbed = false;
      const adjacentCells = getAdjacentCells(rowIndex, colIndex, sortingMatrix);

      for (const [adjRow, adjCol] of adjacentCells) {
        const adjacentCell = sortingMatrix[adjRow][adjCol];
        if (adjacentCell) {
          const mostCommonLetter = findMostCommonLetter(targetCell);
          const index = adjacentCell.indexOf(mostCommonLetter);
          if (index !== -1) {
            targetCell.push(adjacentCell.splice(index, 1)[0]);
            setSortingMatrix([...sortingMatrix]);
            hasAbsorbed = true;
            if (targetCell.length >= 6) break;
          }
        }
      }
    }

    if (targetCell.length === 6 && new Set(targetCell).size !== 1) {
      pushExcessLetter(rowIndex, colIndex);
      while (targetCell.length < 6) {
        const adjacentCells = getAdjacentCells(
          rowIndex,
          colIndex,
          sortingMatrix,
        );
        let found = false;
        for (const [adjRow, adjCol] of adjacentCells) {
          const adjacentCell = sortingMatrix[adjRow][adjCol];
          if (adjacentCell) {
            const mostCommonLetter = findMostCommonLetter(targetCell);
            const index = adjacentCell.indexOf(mostCommonLetter);
            if (index !== -1) {
              targetCell.push(adjacentCell.splice(index, 1)[0]);
              setSortingMatrix([...sortingMatrix]);
              found = true;
              if (targetCell.length >= 6) break;
            }
          }
        }
        if (!found) break;
      }
    }
  };

  //Đẩy chữ cái thừa
  const pushExcessLetter = (rowIndex, colIndex) => {
    const targetCell = sortingMatrix[rowIndex][colIndex];
    if (!targetCell || targetCell.length <= 6) return;

    const leastCommonLetter = findLeastCommonLetter(targetCell);
    const adjacentCells = getAdjacentCells(rowIndex, colIndex, sortingMatrix);

    let targetAdjacentCell = adjacentCells.find(
      ([adjRow, adjCol]) => sortingMatrix[adjRow][adjCol],
    );

    if (!targetAdjacentCell) {
      targetAdjacentCell = adjacentCells.find(
        ([adjRow, adjCol]) => !sortingMatrix[adjRow][adjCol],
      );
    }

    if (!targetAdjacentCell) {
      targetAdjacentCell = adjacentCells.reduce((best, current) => {
        const [bestRow, bestCol] = best || [];
        const [currentRow, currentCol] = current;
        return (sortingMatrix[currentRow][currentCol]?.length || 0) >
          (sortingMatrix[bestRow][bestCol]?.length || 0)
          ? current
          : best;
      }, null);
    }

    if (targetAdjacentCell) {
      const [targetRow, targetCol] = targetAdjacentCell;
      if (!sortingMatrix[targetRow][targetCol])
        sortingMatrix[targetRow][targetCol] = [];
      sortingMatrix[targetRow][targetCol].push(leastCommonLetter);
      targetCell.splice(targetCell.indexOf(leastCommonLetter), 1);
      setSortingMatrix([...sortingMatrix]);
    }
  };

  // Tìm chữ cái phổ biến nhất
  const findMostCommonLetter = cell => {
    if (!cell || cell.length === 0) return null; // Xử lý trường hợp mảng rỗng
    const count = cell.reduce((acc, letter) => {
      acc[letter] = (acc[letter] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
  };

  // Tìm chữ cái ít phổ biến nhất
  const findLeastCommonLetter = cell => {
    if (!cell || cell.length === 0) return null; // Xử lý trường hợp mảng rỗng
    const count = cell.reduce((acc, letter) => {
      acc[letter] = (acc[letter] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(count).reduce((a, b) => (count[a] < count[b] ? a : b));
  };

  // Quét và đặt cell = null nếu cell.length === 0
  const cleanEmptyCells = () => {
    const newSortingMatrix = sortingMatrix.map(row =>
      row.map(cell => (cell && cell.length === 0 ? null : cell)),
    );
    setSortingMatrix(newSortingMatrix);
  };

  // Quét và xử lý tự động
  const autoProcess = () => {
    sortingMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          absorbLetters(rowIndex, colIndex);
          pushExcessLetter(rowIndex, colIndex);
        }
      });
    });
    cleanEmptyCells();
  };

  // Bổ sung lại các cell ở Waiting khi cần thiết
  const refillWaitingMatrix = () => {
    const allCellsUsed = waitingMatrix[0].every(cell => cell === null);
    if (allCellsUsed) {
      const newWaiting = Array(1)
        .fill(null)
        .map(() =>
          Array(3)
            .fill(null)
            .map(() => generateRandomLetters(availableItems, 1, 4)),
        );
      setWaitingMatrix(newWaiting);
    }
  };

  //#endregion

  // Reset game
  const resetGame = () => {
    setDifficulty(null);
    setAvailableItems([]);
    setTargetLetter('');
    setProgress(0);
    setSortingMatrix(Array(6).fill(Array(4).fill(null)));
    setWaitingMatrix(Array(1).fill(Array(3).fill(null)));
  };

  // Hiển thị thông báo chiến thắng
  useEffect(() => {
    if (progress >= targetProgress) {
      Alert.alert('Chúc mừng!', 'Bạn đã chiến thắng!', [
        {text: 'OK', onPress: () => resetGame()},
      ]);
    }
  }, [progress]);

  // Sử dụng useEffect để kiểm tra và bổ sung lại các cell ở Waiting khi cần thiết
  useEffect(() => {
    const allCellsUsed = waitingMatrix[0].every(cell => cell === null);
    if (allCellsUsed) {
      refillWaitingMatrix();
    }
  }, [waitingMatrix]);

  // Gọi autoProcess trong vòng lặp chính hoặc useEffect
  useEffect(() => {
    const interval = setInterval(() => {
      autoProcess();
      checkCompletion();
    }, 1000); // Chạy mỗi giây

    return () => clearInterval(interval);
  }, [sortingMatrix]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://png.pngtree.com/element_our/sm/20180408/sm_5ac9b8967574d.jpg',
        }}
        style={[
          {
            width: width,
            height: height,
          },
          styles.background,
        ]}
      />
      {!difficulty ? (
        <View style={styles.mainView}>
          <Text style={styles.title}>Chọn độ khó:</Text>
          <MiddleSingleMediumButton
            onPress={() => handleDifficultySelection('easy')}
            title={'Dễ'}
          />
          <MiddleSingleMediumButton
            onPress={() => handleDifficultySelection('medium')}
            title={'Nâng Cao'}
          />
          <MiddleSingleMediumButton
            onPress={() => handleDifficultySelection('hard')}
            title={'Khó'}
          />
        </View>
      ) : (
        <View style={styles.mainView}>
          <Text style={styles.title}>Mục tiêu thu thập: {targetLetter}</Text>
          <View style={styles.progressBar}>
            <View
              style={{
                ...styles.progressFill,
                width: `${(progress / targetProgress) * 100}%`,
              }}
            />
            <Text style={styles.progressTitle}>
              Tiến độ: {progress}/{targetProgress}
            </Text>
          </View>
          {sortingMatrix.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => {
                return (
                  <TouchableOpacity
                    key={`cell-${rowIndex}-${colIndex}`}
                    style={[
                      styles.cell,
                      cell ? styles.sortingCell : styles.emptyCell,
                    ]}
                    onPress={() => handlePressSorting(rowIndex, colIndex)}>
                    <Text style={styles.cellText}>
                      {cell ? cell.join('') : ''}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
          {waitingMatrix.map((row, rowIndex) => (
            <View key={`waiting-row-${rowIndex}`} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={`waiting-cell-${rowIndex}-${colIndex}`}
                  style={[styles.cell, styles.waitingCell]}
                  onPress={() => handlePressWaiting(rowIndex, colIndex)}>
                  <Text style={styles.cellText}>
                    {cell ? cell.join('') : ''}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
  },
  //
  UIHeaderMainStyle: {
    top: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    backgroundColor: null,
  },
  UIHeaderIconStyle: {tintColor: colors.inactive},
  //
  mainView: {
    width: '90%',
    padding: 15,
    backgroundColor: colors.transparentWhite,
    borderColor: colors.PrimaryOnContainerAndFixed,
    borderWidth: 2,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.h3,
    fontWeight: 'bold',
    marginVertical: 3,
    color: colors.GrayOnContainerAndFixed,
  },
  progressTitle: {
    left: 0,
    right: 0,
    position: 'absolute',
    fontSize: fontSizes.h4,
    fontWeight: 'bold',
    color: colors.RedContainer,
    textAlign: 'center',
  },
  progressBar: {
    height: 30,
    width: '90%',
    backgroundColor: colors.GrayOnContainerAndFixed,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  cell: {
    width: 50,
    height: 50,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#000',
  },
  sortingCell: {
    backgroundColor: '#ffeb99',
  },
  waitingCell: {
    backgroundColor: '#76c7c0',
  },
  emptyCell: {
    backgroundColor: '#d3d3d3',
  },
  cellText: {
    fontSize: fontSizes.h7,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 3,
    color: colors.GrayOnContainerAndFixed,
  },
});
