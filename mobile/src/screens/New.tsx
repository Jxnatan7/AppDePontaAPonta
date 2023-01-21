import { useState } from 'react'
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import BackButton from '../components/backButton'
import Checkbox from '../components/Checkbox'
import { Feather } from "@expo/vector-icons"
import colors from 'tailwindcss/colors'
import { api } from '../lib/axios'

const avaiableWeekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]

const New = () => {
  const [title, setTitle] = useState("")
  const [weekDays, setWeekDays] = useState<number[]>([])

  const handleToggleWeekDay = (weekDayIndex: number) => {
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if(!title.trim() || weekDays.length === 0) {
        return Alert.alert("Novo hábito", "Informe o nome do hábito e escolha a periodicidade.")
      }

      await api.post("/habits", {
        title,
        weekDays
      })

      setTitle("")
      setWeekDays([])

      Alert.alert("Novo hábito", "Hábito criado com sucesso!")
    } catch (error) {
      console.log(error)
      Alert.alert("Ops", "Não foi possível criar o novo hábito")
    } 
  }
  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100}}
        >
        <BackButton/>

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar novo hábito
        </Text>

        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput 
          placeholder="ex.: Beber 2L de água"
          placeholderTextColor={colors.zinc[400]}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
          onChangeText={setTitle}
          value={title}
          />
        
        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>

        {
          avaiableWeekDays.map((weekDay, index) => (
          
        
            <Checkbox 
              activeOpacity={0.7}
              key={index}
              title={weekDay}
              checked={weekDays.includes(index)}
              onPress={() => handleToggleWeekDay(index)}/>
          ))
        }

        <TouchableOpacity 
          className="flex-row w-full h-14 items-center justify-center bg-green-600 rounded-md mt-6"
          activeOpacity={0.7}
          onPress={handleCreateNewHabit}
          >
          <Feather
            name="check"
            size={20}
            color={colors.white}
          />

          <Text className='font-semibold text-base text-white ml-2'>
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

export default New